{
  let URLObj = new URL(location.href);
  console.log(URLObj);
  if (document.querySelector("#readme table tbody")) {
    let audio_player = new Audio();
    audio_player.setAttribute("autoplay", "true");
    document
      .querySelector("#readme table tbody")
      .addEventListener("click", (event) => {
        // console.log(event)
        // console.log(event.target.nodeType)
        // console.log(event.target.nodeName);
        event.preventDefault();
        event.stopPropagation();
        let audio_url = null;
        if (event.target.nodeName === "TD") {
          let aTag = event.target.querySelector("a");
          if (aTag) {
            audio_url = aTag.getAttribute("href");
          }
        }
        if (event.target.nodeName === "IMG") {
          let aTag = event.target.parentNode.parentNode;
          audio_url = aTag.getAttribute("href");
        }
        if (audio_url) {
          let desURL = new URL(audio_url);
          console.log(desURL.protocol);
          if (desURL.protocol === "http:") {
            //skip http
            location.href = audio_url;
          } else {
            console.log("audio_url:", audio_url);
            audio_player.setAttribute("src", audio_url);
          }
        }
      });
  }
}
