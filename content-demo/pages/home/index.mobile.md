import Header from "./header.md"
import Description from "./description.md"

<Column
  padding={40}
  padding_top={140}
  padding_bottom={80}
>

  <Header />

  ---

  <Description />

  <List
    type={["projects"]}
    row_separation={50}
    column_separation={100}
  />

</Column>
