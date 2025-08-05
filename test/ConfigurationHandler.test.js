import sinon from "sinon"
import fs from "fs"
import jsonfile from "jsonfile"
import ConfigurationHandler from "../src/ConfigurationHandler.js"
import assert from "assert"

describe("ConfigurationHandler", () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("should create config file if missing", () => {
    const existisSyncStub = sandbox.stub(fs, "existsSync")
    const mkdirSyncStub = sandbox.stub(fs, "mkdirSync")
    const writeFileSyncStub = sandbox.stub(fs, "writeFileSync")
    const readFileSyncStub = sandbox
      .stub(jsonfile, "readFileSync")
      .returns({ key: "", model: "gpt-4o" })

    existisSyncStub.onCall(0).returns(false)
    existisSyncStub.onCall(1).returns(false)

    const logStub = sandbox.stub(console, "log")

    const handler = new ConfigurationHandler()

    sinon.assert.calledWith(mkdirSyncStub, sinon.match.string, {
      recursive: true
    })

    sinon.assert.calledWith(
      writeFileSyncStub,
      sinon.match.string,
      sinon.match.string,
      "utf8"
    )

    sinon.assert.called(logStub)
    assert.deepStrictEqual(handler.getConfig(), { key: "", model: "gpt-4o" })
  })

  it("should load config if file exists", () => {
    sandbox.stub(fs, "existsSync").returns(true)
    sandbox
      .stub(jsonfile, "readFileSync")
      .returns({ key: "abc", model: "gpt-3o" })

    const handler = new ConfigurationHandler()

    assert.deepStrictEqual(handler.getConfig(), {
      key: "abc",
      model: "gpt-3o"
    })
    assert.strictEqual(handler.get("key"), "abc")
  })

  it("should save config when set() is called", () => {
    sandbox.stub(fs, "existsSync").returns(true)
    sandbox.stub(jsonfile, "readFileSync").returns({ key: "", model: "gpt-4o" })
    const writeStub = sandbox.stub(jsonfile, "writeFileSync")

    const handler = new ConfigurationHandler()

    assert.strictEqual(handler.get("key"), "")

    handler.set("key", "newKey")

    assert.strictEqual(handler.get("key"), "newKey")
    sinon.assert.calledWith(writeStub, handler.filePath, handler.config, {
      spaces: 2
    })
  })
})
