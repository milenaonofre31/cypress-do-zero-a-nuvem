const { defineConfig } = require("cypress");

module.exports = defineConfig({ //alterando as dimensões de altura e largura padrão do cypress
  projectId: "8zx7px",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {}, //projeto end-to-end
  //video:true
  
});
