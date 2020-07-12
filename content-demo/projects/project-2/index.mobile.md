import Header from "./header.md"
import Description from "./description.md"
import Images from "./images.md"

<Column>

  <Container
    padding={40}
    padding_top={140}
    padding_bottom={80}
    background_color="#c3c4c5"
    child_separation={25}
  >

  <Header />

  ---

  <Description />

  </Container>



  <Container
    child_separation={5}
    padding={5}
    background_color="#41474a"
  >

  <Images />

  </Container>

</Column>
