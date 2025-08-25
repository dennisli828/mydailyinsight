export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: 'OpenAI API key not configured' 
      });
    }

    // For now, simulate successful file processing
    // Real OpenAI integration coming next
    const mockResponse = {
      success: true,
      transcript: [
        {
          timestamp: "00:00:00",
          text: "File upload pipeline is working! Your serverless function received the request successfully."
        },
        {
          timestamp: "00:00:05", 
          text: "OpenAI API key is configured and ready for Whisper integration."
        }
      ],
      summary: "File processing test completed successfully. Ready for OpenAI Whisper integration.",
      insights: [
        "Upload pipeline functional",
        "API key properly configured", 
        "Ready for real transcription"
      ],
      actions: [
        "Add OpenAI Whisper API call",
        "Implement real audio processing"
      ],
      quotes: [{
        quote: "The connection between frontend and backend is working",
        speaker: "System Test",
        timestamp: "00:00:05"
      }]
    };

    res.status(200).json(mockResponse);

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Processing failed',
      details: error.message 
    });
  }
}
