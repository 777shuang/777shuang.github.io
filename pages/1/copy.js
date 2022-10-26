var path = WScript.Argments(1);
function CopyFile(input , output)
{
  var file = new ActiveXObject ("ADODB.Stream");
  file.type = 1;
  //file.charset = "UTF-8";
  //file.LineSeparator = -1;
  file.Open();
  try { file.loadFromFile (input); }
  catch (e)
  {
    WScript.echo ("ファイル \"" + input + "\" が開けません。");
    WScript.Quit (-1);
  }
  var reader = file.ReadText(-1);
  file.Close();
  file.Open();
  file.WriteText(reader , 0);
  file.SaveToFile(output , 2);
  file.Close();
}
CopyFile(path , path + "_");
CopyFile(path + "_" , path);
