using dotnet_migration_toolkit.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_migration_toolkit.Controllers
{
    [Route("api/v1/")]
    [ApiController]
    public class MigrationController : ControllerBase
    {
        private readonly IMigrationService _migrationService;

        public MigrationController(IMigrationService migrationService)
        {
            _migrationService = migrationService;
        }

        #region Controller Methods
        [HttpPost]
        [Route("analyze/json")]
        public async Task<IActionResult> GetJSONReport([FromBody] PathModel pathModel)
        {
            var resString = await _migrationService.GetReport(pathModel.path, "json");
            return Ok(resString);
        }

        [HttpPost]
        [Route("analyze/html")]
        public async Task<IActionResult> GetHTMLReport([FromBody] PathModel pathModel)
        {
            var resString = await _migrationService.GetReport(pathModel.path, "html");
            return Ok(resString);
        }

        [HttpPost]
        [Route("analyze/excel")]
        public async Task<IActionResult> GetExcelReport([FromBody] PathModel pathModel)
        {
            var resString = await _migrationService.GetReport(pathModel.path, "excel");
            return Ok("Success");
        }

        [HttpPost]
        [Route("analyze/dgml")]
        public async Task<IActionResult> GetDGMLReport([FromBody] PathModel pathModel)
        {
            var resString = await _migrationService.GetReport(pathModel.path, "dgml");
            return Ok(resString);
        }


        #endregion
    }
}
