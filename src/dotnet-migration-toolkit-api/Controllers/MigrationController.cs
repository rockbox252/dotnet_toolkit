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
        [HttpGet]
        [Route("analyze")]
        public async Task<IActionResult> Analyze()
        {
           string path= "C:/Users/Hp/Desktop/demo/Spread.Net";
           var resString =await _migrationService.GetJSON(path);
           return Ok(resString);
        }
        #endregion
    }
}
