import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // The client already sends the full payload with metadata
    const submissionData = await request.json()

    // The client generates an ID, but we'll use a server-generated one for reliability.
    // We can extract the original client-generated ID if needed for logging.
    const applicationId = `CERT-S-${Date.now()}` // 'S' for Server

    // Prepare the final payload for n8n.
    // We overwrite the client's metadata with server-generated metadata to be safe.
    const n8nPayload = {
      ...submissionData,
      metadata: {
        ...submissionData.metadata,
        applicationId: applicationId,
        processedAt: new Date().toISOString(), // Add a server timestamp
      },
    }

    console.log("Processing submission:", n8nPayload)

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      console.error("N8N_WEBHOOK_URL is not set.")
      return NextResponse.json(
        { success: false, message: "Server configuration error: Webhook URL is missing." },
        { status: 500 }
      )
    }

    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(n8nPayload),
      })

      if (!n8nResponse.ok) {
        // n8n returned an error (e.g., 4xx, 5xx)
        const errorBody = await n8nResponse.text()
        console.error("n8n webhook returned an error:", n8nResponse.status, n8nResponse.statusText, errorBody)
        return NextResponse.json(
          { success: false, message: `Webhook failed: ${n8nResponse.statusText}` },
          { status: 502 } // 502 Bad Gateway is appropriate here
        )
      }

      // Success
      console.log("Successfully submitted to n8n.")
      return NextResponse.json({
        success: true,
        message: "Формата е изпратена успешно!",
        id: applicationId,
      })
    } catch (n8nError) {
      // Network error or other issue with the fetch call to n8n
      console.error("Error submitting to n8n:", n8nError)
      return NextResponse.json(
        { success: false, message: "Could not connect to the webhook service." },
        { status: 503 } // 503 Service Unavailable
      )
    }
  } catch (error) {
    // Error parsing the request body or other unexpected errors
    console.error("Error processing request:", error)
    return NextResponse.json(
      { success: false, message: "Грешка при обработка на формата" },
      { status: 400 } // 400 Bad Request if the body is malformed
    )
  }
}
