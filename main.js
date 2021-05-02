let c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};
let imagePath = (frameNumber, animation) => {
  return "finisher/images/" + animation + "/" + frameNumber + ".png";
};
let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
};
let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    block: [],
    forward: [],
    backward: [],
  };
  let imagesToLoad = 0;
  ["idle", "kick", "punch", "block", "forward", "backward"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;
      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);
        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;
          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};
let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(200, 0, 500, 500);
      ctx.drawImage(image, 200, 0, 500, 500);
    }, index*100);
  });
  setTimeout(callback, images[animation].length * 100);
};
loadImages((images) => {
  let queuedAnimations = [];
  let aux = () => {
    let selectedAnimation;
    if (queuedAnimations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimations.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimations.push("block");
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimations.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimations.push("backward");
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "s") {
      queuedAnimations.push("kick");
    } else if (key === "a") {
      queuedAnimations.push("punch");
    } else if (key === " ") {
      queuedAnimations.push("block");
    } else if (key === "ArrowRight") {
      queuedAnimations.push("forward");
    } else if (key === "ArrowLeft") {
      queuedAnimations.push("backward");
    }
  });
});
