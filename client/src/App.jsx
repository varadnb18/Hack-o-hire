function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, overflow: "hidden" }}>
      <iframe 
        src="http://localhost:5601/app/lens#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))" 
        style={{ height: "100%", width: "100%", border: "none" }}
      />
    </div>
  );
}

export default App;
