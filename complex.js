let selenium = require('selenium-webdriver');
let test = require('selenium-webdriver/testing');

let browser;
let fileCounter = 0;

test.describe('Some exercises with Google Search', function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new selenium.Builder().forBrowser('chrome').build();
        browser.get('http://www.google.com');
        let searchField = browser.findElement(selenium.By.name('q'))
        searchField.sendKeys('the ting goes');
        fileCounter++;

        done();
    });

    test.afterEach(function(done) {
        browser.takeScreenshot().then(
            function(image, err) {
                require('fs').writeFile('out'+fileCounter+'.png', image, 'base64', function(err) {
                    if(err) 
                    console.log(err);
                });
            }
        );
        browser.quit();

        done();
    });

    test.it('Search for the given text', function(done) {        
        browser.findElement(selenium.By.className('Q8LRLc')).click().then(        
        browser.findElement(selenium.By.name('btnK')).click());

        done();
    });

    test.it('Change the search words', function(done) {
        browser.findElement(selenium.By.className('Q8LRLc')).click();        
        browser.findElement(selenium.By.name('btnK')).click();
        let searchField = browser.findElement(selenium.By.name('q'))
        searchField.clear();
        searchField.sendKeys('szkibidi');

        done();
    });

    test.it('Click the back button after search', function(done) {
        browser.findElement(selenium.By.className('Q8LRLc')).click();        
        browser.findElement(selenium.By.name('btnK')).click()
        browser.navigate().back();

        done();
    })

    test.it('Select an element from the dropdown', function(done) {
        random = 'sbse' + Math.floor(Math.random()*9);
        browser.findElement(selenium.By.id(random)).click();

        done();
    }) //does not work properly

    test.it('Play the video associated to the text', function(done) {
        browser.findElement(selenium.By.className('Q8LRLc')).click();        
        browser.findElement(selenium.By.name('btnK')).click()
        browser.findElement(selenium.By.className('j0joJb')).click();

        done();
    })
});