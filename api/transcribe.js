import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle multipart data
  },
};

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
      return res.status(500).json({ 
        success: false, 
        error: 'OpenAI API key not configured' 
      });
    }

    // Parse the multipart form data
    const form = new IncomingForm();
    const [fields, files] = await form.parse(req);
    
    const audioFile = files.audio?.[0];
    
    if (!audioFile) {
      return res.status(400).json({ 
        success: false, 
        error: 'No audio file provided' 
      });
    }

    // Check file size (Vercel limit is ~4.5MB)
    if (audioFile.size > 4 * 1024 * 1024) {
      return res.status(400).json({ 
        success: false, 
        error: 'File too large. Please use files under 4MB.' 
      });
    }

    // For now, return a test response to verify the file upload works
    // We'll implement real OpenAI integration in the next step
    const mockResponse = {
      success: true,
      filename: audioFile.originalFilename,
      fileSize: audioFile.size,
      transcript: [
        {
          timestamp: "00:00:00",
          text: `Successfully received your file: ${audioFile.originalFilename}. File size: ${Math.round(audioFile.size / 1024)}KB.`
        },
        {
          timestamp: "00:00:05", 
          text: "Your serverless function is working properly! OpenAI Whisper integration coming next."
        },
        {
          timestamp: "00:00:10",
          text: "File upload, parsing, and response generation are all functional."
        }
      ],
      summary: `File processing test completed successfully. Your ${audioFile.originalFilename} file was received and processed by the serverless function.`,
      insights: [
        "File upload pipeline is working correctly",
        "Multipart form data parsing is functional", 
        "Ready for OpenAI API integration"
      ],
      actions: [
        "Proceed to integrate OpenAI Whisper API",
        "Add real transcription functionality",
        "Test with actual audio content"
      ],
      quotes: [
        {
          quote: "The serverless function is processing files correctly",
          speaker: "System Test",
          timestamp: "00:00:05"
        }
      ],
      message: "File upload successful! Ready for OpenAI integration."
    };

    // Return the mock response with file info
    res.status(200).json(mockResponse);

  } catch (error) {
    console.error('File processing error:', error);
    res.status(500).json({ 
      success: false,
      error: 'File processing failed',
      details: error.message 
    });
  }
}
