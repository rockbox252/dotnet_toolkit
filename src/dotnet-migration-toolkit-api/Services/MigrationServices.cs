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
        public Task<string> GetReport(string path, string reportType);
    }

    public class MigrationService : IMigrationService
    {
        #region service methods
        public async Task<string> GetReport(string path, string reportType)
        {
            if (File.Exists(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.{reportType}"))
            {
                File.Delete(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.{reportType}");
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
            var response = File.ReadAllText(@$"{Environment.CurrentDirectory}\ApiPortAnalysis.{reportType}");

            return response;
        }
        #endregion 

    }
}
