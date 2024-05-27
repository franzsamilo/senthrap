/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http"
import handler from "../../pages/api/queryEntries"
import * as queryDocumentModule from "../../pages/api/src/utils/queryDocument"

jest.mock("../../pages/api/src/utils/queryDocument")

const queryDocument = queryDocumentModule.default as jest.Mock

describe("/api/queryEntries API Route", () => {
  it("returns entries for a user", async () => {
    queryDocument.mockResolvedValue([{ id: "1", data: "test" }])

    const { req, res } = createMocks({
      method: "GET",
      query: { userSub: "test-user-id" },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ data: [{ id: "1", data: "test" }] })
  })

  it("returns 401 if no userSub is provided", async () => {
    const { req, res } = createMocks({
      method: "GET",
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(401)
    expect(res._getJSONData()).toEqual({ error: "Unauthorized" })
  })
})
