import React, { useEffect } from "react";
import "aframe";

const AFrameControls = () => {
  useEffect(() => {
    /* global AFRAME */

    // Run Controls
    AFRAME.registerComponent("run-controls", {
      schema: {
        normalSpeed: { type: "number", default: 10 },
        runSpeed: { type: "number", default: 50 },
      },
      init: function () {
        const el = this.el;
        const data = this.data;

        window.addEventListener("keydown", function (event) {
          if (event.key === "Shift") {
            el.setAttribute("wasd-controls", `acceleration: ${data.runSpeed}`);
          }
        });

        window.addEventListener("keyup", function (event) {
          if (event.key === "Shift") {
            el.setAttribute("wasd-controls", `acceleration: ${data.normalSpeed}`);
          }
        });
      },
    });

    // Jump Controls
    AFRAME.registerComponent("jump-controls", {
      schema: {
        jumpHeight: { type: "number", default: 5 },
        gravity: { type: "number", default: -9.8 },
      },
      init: function () {
        this.velocityY = 0;
        this.isJumping = false;
        this.groundLevel = this.el.object3D.position.y;

        window.addEventListener("keydown", (event) => {
          if (event.code === "Space" && !this.isJumping) {
            console.log("saltando!!!");
            this.isJumping = true;
            this.velocityY = this.data.jumpHeight;
          }
        });
      },
      tick: function (time, timeDelta) {
        const position = this.el.object3D.position;
        if (this.isJumping) {
          position.y += this.velocityY * (timeDelta / 1000);
          this.velocityY += this.data.gravity * (timeDelta / 1000);
          if (position.y <= this.groundLevel) {
            position.y = this.groundLevel;
            this.isJumping = false;
            this.velocityY = 0;
          }
        }
      },
    });

    // Log Position
    AFRAME.registerComponent("log-position", {
      tick: function () {
        const position = this.el.object3D.position;
        const positionData = {
          x: position.x.toFixed(2),
          y: position.y.toFixed(2),
          z: position.z.toFixed(2),
        };
        this.el.emit("position-updated", positionData);
      },
    });

    // Custom Look Controls
    AFRAME.registerComponent("custom-look-controls", {
      init: function () {
        this.lookControls = this.el.components["look-controls"];
        this.mouseSensitivity = 1; // Ajusta sensibilidad
        this.originalMouseMove = this.lookControls.onMouseMove.bind(
          this.lookControls
        );
        this.lookControls.onMouseMove = this.onMouseMove.bind(this);
      },
      onMouseMove: function (event) {
        event.movementX *= this.mouseSensitivity;
        event.movementY *= this.mouseSensitivity;
        this.originalMouseMove(event);
      },
    });
  }, []);

  return null; // No renderiza nada visualmente
};

export default AFrameControls;
