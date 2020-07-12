---
title: "Project 3"
subtitle: "Minim veniam"
thumb_img: "/img/joel-filipe-SIyGeJeWAcY-unsplash.jpg"
---

import Header from "./header.md"
import Description from "./description.md"
import Images1 from "./images-1.md"
import Images2 from "./images-2.md"

<Column
  min_width={400}
  padding={50}
  padding_top={150}
  child_separation={25}
  color="rgba(255,255,255,0.9)"
  background_color="#4f5356"
>

  <Header />

  ---

  <Description />

</Column>

<Column
  padding={80}
  child_separation={80}
  background_color="#e5ebec"
>

  <Images1 />

</Column>

<Column
  padding={80}
  child_separation={80}
  background_color="#e5ebec"
>

  <Images2 />

</Column>
