---
title: "Name"
---

import Header from "./header.md"
import Description from "./description.md"

<Column
  min_width={400}
  padding_top={150}
  padding_bottom={50}
  padding_left={50}
  child_separation={25}
>

  <Header />

  <Hr margin_top={100} />

  <Description />

</Column>

<Column padding={80}>

  <List
    type={["projects"]}
    row_separation={50}
    column_separation={100}
  />

</Column>
