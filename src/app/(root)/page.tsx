import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import "./_styles/FirstPage.css";

export default function Home() {
  return (
    <div className="container">
      <div className="content-wrapper">
        <Header />
        <div className="grid-container">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
