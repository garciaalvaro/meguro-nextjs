---
breakpoint_width: 800
---

import Header from "./header.md"
import Description from "./description.md"

<Column
  padding={40}
  padding_top={140}
  padding_bottom={80}
  child_separation={25}
>

  <Header />

  <Description />

  <List
    type={["projects"]}
    show_subtitle={true}
    padding_top={30}
    padding_bottom={40}
    row_separation={40}
    column_separation={40}
    column_min_width={150}
  />

</Column>
