/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http"
import handler from "../../pages/api/uploadEntry"
import * as uploadDocumentModule from "../../pages/api/src/utils/uploadDocument"

jest.mock("../../pages/api/src/utils/uploadDocument")

const uploadDocument = uploadDocumentModule.default as jest.Mock

describe("/api/uploadEntry API Route", () => {
  it("uploads a new entry", async () => {
    uploadDocument.mockResolvedValue(null)

    const { req, res } = createMocks({
      method: "POST",
      body: {
        entry_mood: "Happy",
        entry_content: "Content",
        user_id: "test-user-id",
        entry_symptoms: "None",
        entry_activity: "Running",
        entry_advice: "Stay active",
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      message: "Mood log uploaded successfully",
    })
  })

  it("returns 400 if required fields are missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        entry_mood: "Happy",
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({ message: "Missing required fields" })
  })
})
