import Player from "./components/Player";

function App() {
  const url = 'https://synthesia-ttv-data.s3-eu-west-1.amazonaws.com/video_data/ef16d46f-d0c8-4090-af78-36673b73ca66/transfers/target_transfer.mp4'
  const title = 'Test task'
  const callToActionText = 'Github'
  const callToActionUrl = 'https://github.com/lviekmuf/facepop'
  const description = `Hi, Lucas! This is a test task for developing a FacePop widget for customer service and business. Written using React and TailwindCSS.`
  const videoData = {
    title,
    callToActionUrl,
    callToActionText,
    description,
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900">
      <p className="m-6 tracking-wide text-2xl text-center">
        <p>This is a test task for developing a FacePop widget for customer service and business.</p>
        <p> Written using React and TailwindCSS</p> 
      </p>
      <div className="flex justify-center mt-4 text-center ">
        <a
          className="px-4 py-2 text-white rounded bg-black b hover:bg-indigo-600"
          href="https://github.com/lviekmuf/facepop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <Player videoUrl={url} videoData={videoData}/>
      </div>
    </div>
  );
}

export default App;
