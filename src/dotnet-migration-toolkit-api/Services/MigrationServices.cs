using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace dotnet_migration_toolkit.Services
{

    public interface IMigrationService
    {
        public Task<string> GetReport(string path, string reportType);
    }

    public class MigrationService : IMigrationService
    {
        #region service methods
        public async Task<string> GetReport(string path, string reportType)
        {
            if (File.Exists(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.xlsx"))
            {
                File.Delete(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.xlsx");
            }
            if (File.Exists(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.html"))
            {
                File.Delete(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.html");
            }
            if (File.Exists(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.json"))
            {
                File.Delete(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.json");
            }
            if (File.Exists(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.dgml"))
            {
                File.Delete(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.dgml");
            }


            using (var process = new Process())
            {
                process.StartInfo.FileName = @$"{Environment.CurrentDirectory}\ApiPort\ApiPort.exe"; // relative path. absolute path works too.
                process.StartInfo.Arguments = $"analyze -r {reportType} -f {path}";
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;

                process.OutputDataReceived += (sender, data) => Console.WriteLine(data.Data);
                process.ErrorDataReceived += (sender, data) => Console.WriteLine(data.Data);
                Console.WriteLine("starting");
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                var exited = process.WaitForExit(1000 * 30);     // Waiting for the file generation for 30 seconds
                Console.WriteLine($"exit {exited}");
            }

            var data = File.ReadAllText(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.{reportType}");
            var dataObject = JObject.Parse(data);

            if (reportType.ToLower() == "json")
            {
                if (!path.Contains("dll"))
                {
                    var solFilePath = Directory.GetFiles(path, "*.sln");
                    if (solFilePath.Length > 0)
                    {
                        var solFileLines = File.ReadAllLines(@$"{solFilePath[0]}");
                        var projList = new ArrayList();
                        foreach (var line in solFileLines)
                        {
                            if (line.Contains("csproj"))
                            {
                                var projName = line.Split("\\")[1].Split(",")[0];
                                projList.Add(projName);
                            }
                        }

                        JArray array = new JArray();
                        for (int i = 0; i < projList.Count; i++)
                        {
                            array.Add(projList[i]);
                        }
                        dataObject["SubProjects"] = array;
                    }
                }
            }

            var response = dataObject.ToString();
            return response;
        }
        #endregion 

    }
}
