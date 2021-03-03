using dotnet_migration_toolkit.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [Route("migrate")]
        public async Task<IActionResult> Migrate()
        {
            _migrationService.Migrate();
            return Ok("success");
        }
        #endregion
    }
}
