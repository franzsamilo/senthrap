import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/uploadSummary";
import * as uploadDocumentModule from "../../pages/api/src/utils/uploadDocument";

jest.mock("../../pages/api/src/utils/uploadDocument");
const uploadDocument = uploadDocumentModule.default as jest.Mock;

describe("/api/uploadSummary API Route", () => {
  it("uploads a new summary", async () => {
    uploadDocument.mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "POST",
      body: {
        summary_content: "This is a test summary",
        user_id: "test-user-id",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: "Summary uploaded successfully",
    });
  });

  it("returns 400 if required fields are missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        summary_content: "This is a test summary",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: "Missing required fields" });
  });
});
