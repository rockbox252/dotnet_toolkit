using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_migration_toolkit.Services
{

    public interface IMigrationService
    {
        public Task<string> GetJSON(string path);
    }

    public class MigrationService : IMigrationService
    {
        #region service methods
        public async Task<string> GetJSON(string path)
        {
           if(File.Exists(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.html"))
            {
                File.Delete(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.html");
            }

            using (var process = new Process())
            {
                process.StartInfo.FileName = @$"{Environment.CurrentDirectory}\ApiPort\ApiPort.exe"; // relative path. absolute path works too.
                process.StartInfo.Arguments = $"analyze -r HTML -f {path}";
                //process.StartInfo.FileName = @"cmd.exe";
                //process.StartInfo.Arguments = @"/c dir";      // print the current working directory information
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
                var exited = process.WaitForExit(1000 * 30);     // (optional) wait up to 10 seconds
                Console.WriteLine($"exit {exited}");
            }
            var response = File.ReadAllText(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.html");
            
            return response;
        }
        #endregion 

    }
}
