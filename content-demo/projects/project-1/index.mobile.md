---
title: "Project 1"
thumb_img: "/img/joel-filipe-2BLsWpau-GQ-unsplash.jpg"
---

import Header from "./header.md"
import Description from "./description.md"
import Images from "./images.md"

<Column>

  <Container
    padding={40}
    padding_top={140}
    padding_bottom={80}
    background_color="#cdd2d8"
  >

  <Header />

  </Container>



  <Container padding={10} child_separation={10}>

  <Images />

  </Container>



  <Container
    padding={40}
    padding_top={80}
    padding_bottom={80}
    child_separation={20}
    background_color="#cdd2d8"
  >

  <Description />

  </Container>

</Column>
