import Header from "./header.md"
import Description from "./description.md"
import Images1 from "./images-1.md"
import Images2 from "./images-2.md"

<Column>

  <Container
    padding={40}
    padding_top={140}
    padding_bottom={80}
    child_separation={25}
  	color="rgba(255,255,255,0.9)"
  	background_color="#4f5356"
  >

  <Header />

  ---

  <Description />

  </Container>



  <Container padding={50} child_separation={50}>

  <Images1 />
  <Images2 />

  </Container>

</Column>
