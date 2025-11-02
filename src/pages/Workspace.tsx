import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import DocumentViewer from '../components/DocumentViewer'; // This is now the initial upload screen
import AIPanel from '../components/AIPanel';
import { startAnalysis } from '../services/apiService'; // Use the new API service function
import { Loader2, FileCheck2, MessageSquare } from 'lucide-react';

// --- Helper Component: Analysis In Progress View ---
// This is shown after a file is uploaded and the backend is processing it.
function AnalysisInProgress({ docId }: { docId: string }) {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center p-8">
        <Loader2 className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Analysis in Progress
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
          Your document is being processed by our AI pipeline. This may take a few moments. You can safely leave this page and check back later.
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
          Job ID: {docId}
        </p>
      </div>
    </main>
  );
}

// --- Helper Component: Results Dashboard View ---
// This is a placeholder for where the final analysis results will be displayed.
function ResultsDashboard({ results }: { results: any }) {
    return (
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FileCheck2 className="w-8 h-8 text-green-500" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Analysis Complete
                    </h2>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Impact Summary:</h3>
                    <pre className="text-left bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                        {JSON.stringify(results, null, 2)}
                    </pre>
                </div>
            </div>
        </main>
    );
}

// --- Main Workspace Component ---
function Workspace() {
  // NEW STATE: Manages the current stage of the analysis workflow.
  type AnalysisStatus = 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'COMPLETE' | 'ERROR';
  
  // *** THIS IS THE CORRECTED LINE ***
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('IDLE');
  
  // NEW STATE: Stores the unique job ID received from the backend after upload.
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  // NEW STATE: Stores the final JSON results when the analysis is complete.
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  // NEW STATE: To trigger a refresh in the sidebar when an analysis is done.
  const [refreshSidebarKey, setRefreshSidebarKey] = useState(false);


  /**
   * This function is triggered by the DocumentViewer component when a user selects a file.
   * It starts the entire asynchronous analysis workflow.
   */
  const handleFileUpload = async (file: File) => {
    setAnalysisStatus('UPLOADING');
    try {
      // 1. Send the file to our Flask backend.
      const result = await startAnalysis(file);
      
      // 2. The backend immediately returns a unique `doc_id`. Store it.
      setCurrentDocId(result.doc_id);
      
      // 3. Update the UI to show the "Analysis in Progress" screen.
      setAnalysisStatus('PROCESSING');
      
      // --- MOCKING THE ASYNC PROCESS ---
      // In a real application, this is where you would start polling a `/status/<doc_id>` endpoint.
      // For now, we'll simulate a 5-second processing time.
      console.log(`Simulating 5-second analysis for doc_id: ${result.doc_id}`);
      setTimeout(() => {
        // After 5 seconds, we pretend the analysis is done and set the results.
        const mockResults = {
          "document_name": file.name,
          "analysis_id": result.doc_id,
          "summary": "The new directive imposes stricter consumer protection rules, impacting e-commerce platforms.",
          "impacted_companies": {
            "High Negative Impact": ["Amazon", "Shopify"],
            "Moderate Negative Impact": ["Walmart", "Target"],
            "Potential Positive Impact": ["Local small businesses"]
          },
          "risk_score": -0.65
        };
        setAnalysisResult(mockResults);
        setAnalysisStatus('COMPLETE');
        
        // Refresh the sidebar to show the newly analyzed document.
        setRefreshSidebarKey(prev => !prev); 
      }, 5000);

    } catch (error) {
      console.error("Error starting analysis:", error);
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      setAnalysisStatus('ERROR');
    }
  };

  // --- Functions below are placeholders for future functionality ---
  // They will be used to view historical analyses from the sidebar.
  const handleSelectDocument = (docId: string) => {
    console.log("Future feature: Loading historical analysis for docId:", docId);
    // Here you would fetch results for `docId` and set the state to 'COMPLETE'
    // e.g., getAnalysisResults(docId).then(res => { setAnalysisResult(res); setStatus('COMPLETE'); });
  };

  const handleNewAnalysis = () => {
    // Reset the state to allow for a new upload.
    setAnalysisStatus('IDLE');
    setCurrentDocId(null);
    setAnalysisResult(null);
  };
  
  // Renders the main content area based on the current analysis status.
  const renderMainContent = () => {
    switch (analysisStatus) {
      case 'UPLOADING':
      case 'PROCESSING':
        return <AnalysisInProgress docId={currentDocId!} />;
      case 'COMPLETE':
        return <ResultsDashboard results={analysisResult} />;
      case 'ERROR':
        return (
          <main className="flex-1 bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold text-red-500 mb-4">Analysis Failed</h3>
              <p className="text-slate-500 mb-6">Something went wrong. Please try uploading the document again.</p>
              <button onClick={handleNewAnalysis} className="px-6 py-2 bg-slate-900 text-white rounded-lg">
                Try Again
              </button>
            </div>
          </main>
        );
      case 'IDLE':
      default:
        // By default, show the upload screen.
        return <DocumentViewer onFileUpload={handleFileUpload} isUploading={analysisStatus === 'UPLOADING'} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          // The sidebar will be used to view past analyses.
          selectedDocument={currentDocId}
          onSelectDocument={handleSelectDocument}
          // The "New Chat" button will now start a new analysis.
          onNewChat={handleNewAnalysis}
          // This key will force the sidebar to re-fetch data after an analysis completes.
          refreshKey={refreshSidebarKey}
          onDeleteDocument={() => console.log("Delete document")} // Placeholder
        />
        
        {renderMainContent()}

        {/* The AI Panel can be used to ask follow-up questions about the *results* later. */}
        {/* For now, it can be a simple placeholder or be conditionally rendered. */}
        <aside className="w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <div className="text-center px-6">
                <MessageSquare className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Assistant</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {analysisStatus === 'COMPLETE' ? 'Ask follow-up questions about the analysis results.' : 'Complete an analysis to activate the assistant.'}
                </p>
            </div>
        </aside>

      </div>
    </div>
  );
}

export default Workspace;