const BASE_URL = 'http://localhost:5000/api';

/**
 * Uploads any file to the backend to start the analysis pipeline.
 * @param file The file to upload (e.g., PDF, HTML, CSV).
 * @returns The JSON response from the server, containing the { doc_id }.
 */
export async function startAnalysis(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Upload failed');
  }
  return response.json();
}

/**
 * (Placeholder) Checks the status of an analysis job.
 * @param doc_id The ID of the document analysis job.
 * @returns The JSON response with the current status.
 */
export async function checkAnalysisStatus(doc_id: string) {
  // This endpoint doesn't exist yet on the backend, but we'll build the frontend for it.
  console.log(`(Mock API) Checking status for: ${doc_id}`);
  // In a real scenario, this would fetch from `${BASE_URL}/status/${doc_id}`
  // We'll mock a response for now.
  return Promise.resolve({ doc_id: doc_id, status: "PROCESSING" }); 
}

/**
 * (Placeholder) Fetches the final results of a completed analysis.
 * @param doc_id The ID of the document analysis job.
 * @returns The JSON containing the analysis results.
 */
export async function getAnalysisResults(doc_id: string) {
  // This endpoint also doesn't exist yet.
  console.log(`(Mock API) Fetching results for: ${doc_id}`);
  // In a real scenario, this would fetch from `${BASE_URL}/results/${doc_id}`
  return Promise.resolve({
    "Tesla": {"impact":"negative","score":-0.72,"reason":"EV tariff"},
    "Ford": {"impact":"positive","score":0.31,"reason":"domestic subsidy"}
  });
}