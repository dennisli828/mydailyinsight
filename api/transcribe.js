export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Get the audio file from request
    const formData = new FormData();
    
    // Handle file upload (simplified version)
    // In a real implementation, you'd parse multipart form data
    const audioFile = req.body; // This would need proper multipart parsing
    
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // For now, return a simulated response to test the connection
    // We'll implement real transcription once we verify this works
    const mockResponse = {
      success: true,
      transcript: [
        {
          timestamp: "00:00:00",
          text: "This is a test transcription from your Vercel function! OpenAI integration is working."
        },
        {
          timestamp: "00:00:05", 
          text: "Your API key is properly configured and the serverless function is running."
        }
      ],
      message: "Serverless function working! Ready to add real OpenAI integration."
    };

    // Return the mock response
    res.status(200).json(mockResponse);

  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ 
      error: 'Transcription failed',
      details: error.message 
    });
  }
}
