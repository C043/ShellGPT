import assert from "assert";
import sinon from "sinon";
import ShellGPT from "../src/ShellGPT.js";

describe("ShellGPT", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should handle a user prompt and call OpenAI API", async () => {
    const fakeConfig = {
      key: "FAKE_KEY",
      model: "gpt-4o"
    };

    const shellGPT = new ShellGPT();

    shellGPT.configurationHandler.getConfig = () => fakeConfig;

    shellGPT.initialize();

    const completionStub = sandbox.stub().resolves({
      choices: [{ message: { content: "Hello from OpenAI" } }]
    });

    shellGPT.client.chat = {
      completions: {
        create: completionStub
      }
    };

    const rlStub = {
      output: { write: sinon.stub() },
      pause: sinon.stub(),
      resume: sinon.stub()
    };

    shellGPT.rl = rlStub;

    await shellGPT.handlePrompt("Hello");

    assert.strictEqual(shellGPT.messages.length, 2);
    assert.strictEqual(shellGPT.messages[0].role, "user");
    assert.strictEqual(shellGPT.messages[1].role, "assistant");
    assert.strictEqual(shellGPT.messages[1].content, "Hello from OpenAI");

    sinon.assert.calledOnce(completionStub);
    sinon.assert.calledWithMatch(completionStub, {
      model: fakeConfig.model,
      messages: [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hello from OpenAI" }
      ]
    });
  });
});
