Blockly.Blocks['class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("クラス");
    this.appendStatementInput("MEMBER")
        .setCheck(["type", "function"])
        .appendField("メンバ");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['int'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["8","bit_8"], ["16","bit_16"], ["32","bit_32"], ["64","bit_64"]]), "BIT")
        .appendField("ビットの整数型");
    this.setPreviousStatement(true, "type");
    this.setNextStatement(true, "type");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['char'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("文字型");
    this.setPreviousStatement(true, "type");
    this.setNextStatement(true, "type");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['struct'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("構造体");
    this.appendStatementInput("MEMBER")
        .setCheck(null)
        .appendField("メンバ変数");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};