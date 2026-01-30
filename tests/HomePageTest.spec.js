const { test, expect }= require('@playwright/test');

test('Home Page', async ({page})=>{
    await page.goto('https://sgouqa.cdipd.in/index',{
        waitUntil: 'domcontentloaded',
    timeout: 60000
  });

    const loginRegisterBtn=await page.locator('#profileDropdown')
    await expect(loginRegisterBtn).toBeVisible()
      await loginRegisterBtn.click();
      console.log("clicked on loginReg")
      
//     const candidateLoginBtn=await page.locator("//a[@href='login-candidate' and contains(@class,'btn-primary') and normalize-space()='Login']")
// await candidateLoginBtn.click();

// const loginBtn=await page.locator('#logName')
// await expect(loginBtn).toHaveAttribute('type','text')

//await expect (await page.locator("//h4[@class='text-primary mt-3 mb-3']")).toHaveText('Candidate/Student Login')

const officialLoginBtn=page.locator('a[href="login-official"]');
//await expect (officialLoginBtn).toHaveText('Login');
await expect(officialLoginBtn).toBeVisible();
 await officialLoginBtn.click();



const loginInput=await page.locator("//input[@id='logName']")
await loginInput.fill('ce@sgou.ac.in');
await expect(loginInput).toHaveValue('ce@sgou.ac.in')


} );