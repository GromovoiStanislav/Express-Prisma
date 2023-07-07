// @ts-check
import path from 'node:path'
import fs from 'node:fs'
import { TestEnvironment } from 'jest-environment-node'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// fix for 'How to fix "__dirname is not defined in ES module scope"'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const prismaBinary = path.join(
    __dirname,
    '..',
    'node_modules',
    '.bin',
    'prisma',
)

class PrismaTestEnvironment extends TestEnvironment {
    /** @type {import('@jest/types').Config.ProjectConfig} */

    constructor(config, _context) {
        super(config, _context)

        // Generate a unique sqlite identifier for this test context
        this.dbName = `test.db`
        process.env.DB_URL = `file:./${this.dbName}`
        this.global.process.env.DB_URL = `file:./${this.dbName}`
        this.dbPath = path.join(__dirname, this.dbName)
    }

    async setup() {
        // Run the migrations to ensure our schema has the required structure
        // await exec(`${prismaBinary} db push  `)
        return super.setup()
    }

    async teardown() {
        try {
            //await fs.promises.unlink(this.dbPath)
        } catch (error) {
            // doesn't matter as the environment is torn down
        }
    }
}

export default PrismaTestEnvironment