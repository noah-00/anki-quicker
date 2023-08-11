export default function Index({ navigateToPage }) {
  return (
    <div>
      <main>
        <h1>Index Page ./components/Index/index.js</h1>
        <p>{"[ - This is Index page content - ]"}</p>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
      </main>
    </div>
  );
}
