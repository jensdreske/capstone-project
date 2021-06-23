```jsx
import { BrowserRouter as Router } from "react-router-dom";
import { countryData, player } from "../lib/variables.js";
<Router>
  <Footer playerScore={player} countryData={countryData} isStatic />
</Router>;
```
