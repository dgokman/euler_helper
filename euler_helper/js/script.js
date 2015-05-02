function init() {
  //closure to prevent access to these variables
  var fnum = document.getElementById("fibonth");
  var factnum = document.getElementById("factorial");
  var bin1 = document.getElementById("bin1");
  var bin2 = document.getElementById("bin2");
  var pnum = document.getElementById("prime");
  var pnthnum = document.getElementById("primenth");
  var button = document.getElementById("button")
  var binomialInvalid = false
  var prime_arr = [2]

  //add event handler for button
  button.addEventListener('click', reset, false)

  //handle any change in form input automatically
  fnum.onchange = function(){
    //validate input
    if (validateNum(this)) return;
    // calculate value if number
    var fibonum = fibo(parseInt(fnum.value))
    //DOM modification
    document.getElementById("fibonum").innerHTML = fibonum;
  }

  factnum.onchange = function(){
    //validate input
    if (validateNum(this)) return;
    //calculate value if number
    var factonum = factorial(parseInt(factnum.value))
    document.getElementById("factorialnum").innerHTML = factonum;
  }

  bin1.onchange = function(){
    binomialCalc(this);
  }

  bin2.onchange = function(){
    binomialCalc(this);
  }

  pnum.onchange = function(){
    //validate input
    if (validateNum(this)) return;
    //calculate if value is number
    var primenum = isPrime(parseInt(document.getElementById("prime").value))
    document.getElementById("primenum").innerHTML = primenum;
   }

  pnthnum.onchange = function(){
    //validate input
    if (validateNum(this)) return;
    if (parseInt(this.value) > 9592) {
      alert("sorry, this prime exceeds the limit");
      return;
    }
    //calculate if value is number
    generatePrimes();
    var nthprime = prime_arr[parseInt(document.getElementById("primenth").value) - 1];
    document.getElementById("primenthnum").innerHTML = nthprime;
  }

  function reset(){
    for (var i = 0; i < document.getElementsByClassName("helper").length; i++) {
      document.getElementsByClassName("helper")[i].innerHTML = ""
    }
    for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
      document.getElementsByTagName("input")[i].value = ""
    }
  }

  function generatePrimes() {
    for (var x=3; x < 100000; x += 2) {
      if (isPrime(x)) prime_arr.push(x);
    }
  }

  function isPrime(num) {
    var result = true;
    if (Math.abs(num) == 1) return false
    if (num !== 2) {
      if (num % 2 == 0) {
          result = false;
      } else {
          for (var x=3; x<=Math.sqrt(num); x+=2) {
            if (num % x == 0) result = false;
         }
      }
    }
    return result;
  }

  function binomialCalc(el) {
    if (bin1.value === "" || bin2.value === "") return;
    if (parseInt(bin1.value) < parseInt(bin2.value)) {
      alert("1st number cannot be less than 2nd number");
      return;
    }
    if (validateNum(el)) {
      binomialInvalid = true;
    }
    else {
      binomialInvalid = false;
    }
    if (binomialInvalid) return;
    //calculate if both values are number
    var fact1 = factorial(parseInt(document.getElementById("bin1").value))
    var fact2 = factorial(parseInt(document.getElementById("bin2").value))
    var fact3 = factorial((parseInt(document.getElementById("bin1").value) - parseInt(document.getElementById("bin2").value)))
    var binomial = fact1 / (fact2*fact3)
    document.getElementById("binnum").innerHTML = binomial;
  }

  function factorial(x) {
    if (x == 0 || x == 1) {
      return 1
    }
    else {
      return x * factorial(x-1)
    }
  }

  function validateNum(el) {
    if (isNaN(parseInt(el.value))) {
      alert("Input must be a number")
      return true
    }
  }

  //algorithm taken from here: http://will.thimbleby.net/algorithms/doku.php?id=fibonacci
  function fibo(n) {
    if (n <= 0) {
      return 0;
    }
    else {
      return fibo2(n-1)[1];
    }
  }

  function fibo2(n) {
    if (n <= 0) {
        return [0, 1];
    }
    else {
      var ab = fibo2(Math.floor(n / 2));
      var a = ab[0], b = ab[1];
      var c = a * (2 * b - a);
      var d = b * b + a * a;
      if (n % 2 == 0) {
        return [c, d];
      }
      else {
        return [d, c + d];
      }
    }
  }
}

init();

