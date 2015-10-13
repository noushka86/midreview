var mocha = require('mocha'),
    chai = require('chai')

var assert = chai.assert;
var expect = chai.expect;

// 9. write a function called pipeline. it should take three inputs: (1) a string of text, (2) a function, and (3) another function. it should use functions (2) and (3) on the input, one after the other, and return a new string that has been processed by both function (2) and function (3).

// for example, presuming i have a function called capitalize() and a function called removeFirstLetter, i should be able to do this

// >>> var newWord = pipeline('america')
// >>> 'Americ'

// 10. write a function called map that will take an array and a callback as input.

// 11. this one will be tricky and also really interesting. your task is to hack the built-in array method (hint: where do the methods on an array live?). replace map with a method that does ALMOST the same thing as the built-in map. the difference is, your map will add an extra element to the end: an "X." (feel free to replace the X with your own tag, but the mocha test will fail.)

// 12. create a jquery promise/deferred object that will resolve true, and execute an associated callback, after 1 second. 

// 13. create a constructor called Place. the important methods on place are .fetchData() and .getCoords(). fetchData should take the name of a place as input, make a request to an api of your choosing (hint: googlemaps geocoding), and store the latitude and longitude of the place in an object, retrievable with the getCoords method. 

var pipeline=function(num,func1,func2){
    var value=num;
    value=func1(value);
    value=func2(value);

    return value

}

// test for #9
describe("pipeline()",function(){
    it("should pipe the outputs of the functions passed in as arguments into a final value",function(){
    	var squareNum = function(num) {return num * num},
    		doubleNum = function(num) {return num * 2},
    		inverseNum = function(num) {return 1 / num}

        expect(pipeline(5,doubleNum,squareNum)).to.equal(100)
        expect(pipeline(10,squareNum,inverseNum)).to.equal(.01)
    })
})

var map=function(array,func){
   
   return  array.map(func)
}

// test for #10
describe("map()",function(){
    it("should return a new copy of the array after the given transformation",function(){

    	expect(map([4,9,16],Math.sqrt)).to.deep.equal([2,3,4])
    })
})


Array.prototype.map = function(func){
var newArr=[]
        for(var i=0; i<this.length; i++){
            newArr.push(func(this[i]))
        }

        newArr.push('X');
        return newArr
    }




//test for #11
describe("Array", function(){ // a Constructor name
    describe("#map()", function(){ // a method of said Constructor
		it("should behave as normal, except with an extra 'X' at the end of the array",function(){
			expect([5.5,2.1,100.9].map(Math.floor)).to.deep.equal([5,2,100,"X"])
		})
	})
})

// no tests for the last two, as jquery is required, but i'll review them by sight. 
// #12
$.ajax({
    url: "https://openapi.etsy.com/v2/listings/active.js",
    dataType: 'jsonp',
    data: {api_key: "v4scom4wfeznsgrvftmz39if"},
}).done(
    
     setTimeout(function(){
             console.log("success");

     }, 1000)   
    
)
// #13

var Place=function(){
    this.fetchData=function(placeName){
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            // dataType: 'jsonp',
            data: {address: placeName},
        })
        .done(function(responseData) {
            this.coords=responseData.results[0].geometry.location
        })
        
        
    }

    this.getCoords=function(){
        return this.coords
        }
         // return this.coords
}

var place=new Place();
place.fetchData("Washington")
place.getCoords()
