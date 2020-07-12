---
title: "Name"
subtitle: "Portfolio"
---

import Header from "./header.md"
import Description from "./description.md"

<Column
  min_width={400}
  max_width={500}
  padding_top={120}
  padding_bottom={50}
  padding_left={50}
  child_separation={25}
>

  <Header />

  <Description />

</Column>

<Column padding={80}>

  <List
    type={["projects"]}
    show_subtitle={true}
    row_separation={50}
    column_separation={100}
    column_min_width={150}
  />

</Column>
