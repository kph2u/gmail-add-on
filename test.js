function test() {
  var obj = new ClioBaseApi(["data"], "token", ["fields"])
  return obj.buildApiUrl("4");
}

function biggerTest() {
  Logger.log("%s", test());
  Logger.log("%s", test());
}