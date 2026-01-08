import { expect, test } from '@serenity-js/playwright-test'
import { By, ByCssContainingText, Click, Enter, ExecuteScript, Hover, isVisible, ModalDialog, Navigate, Page, PageElement, Switch, Text } from '@serenity-js/web'
import { Ensure, contain, endsWith, equals, includes, isPresent } from '@serenity-js/assertions';
import { Duration, Wait, WaitUntil } from '@serenity-js/core';





test.describe('ASSESSMENT CX Q UALITY ASSURANCE ENGINEER', () => {
    
    const expectedUrl = 'https://demoqa.com/'
    test.beforeEach(async ({ actorCalled }) => {
        await actorCalled('Alejandro').attemptsTo(
            Navigate.to(expectedUrl)
        )
    })

    test.describe('Caso 1: Navegar a la Página Principal', () => {
        
        
        test('La página carga sin errores.', async ({page}) => { 
            
            await expect(page).toHaveURL(/.*demoqa./) 
            await page.close()
        })

        test('Se visualizan correctamente las secciones:', async ({page}) => {

            const bodyCards = page.locator('h5')
            const loadPage = page.goto('https://demoqa.com/')

            const cardsList = {
                "elements": "category-cards",
                "forms": "category-cards",
                "alerts, frame & windows": "category-cards",
                "widgets": "category-cards",
                "interactions" : "category-cards",
                "book store application": "category-cards"
            }

            for(const cards in cardsList){
                await bodyCards.filter({hasText: cards}).all
                await loadPage
            } 

            await expect(bodyCards).toHaveText(["Elements", "Forms", "Alerts, Frame & Windows", "Widgets", "Interactions", "Book Store Application"])
            await page.close()
        })
    })

    test.describe('Caso 2: Section Elements - Text Box', () => {

        test('La sección muestra información que confirma que los valores ingresados quedaron reflejados', async ({actorCalled, page }) => { 
            
            const elementsCard = PageElement.located(By.cssContainingText('.card-body','Elements'))
            const textBox = PageElement.located(By.cssContainingText('.btn', 'Text Box')).describedAs('text')
            const elementSubButton = PageElement.located(By.cssContainingText('.btn', 'Submit')).describedAs('button')
            const output = PageElement.located(By.id('output')).describedAs('output')
            const nameTextBox = PageElement.located(By.css("input[placeholder='Full Name']"))
            const emailTextBox = PageElement.located(By.css("input[placeholder='name@example.com']"))
            const name = "Alejandro Cueca"
            const email = 'Alejandro@test.com'
            const outputResult = [name, email]
            
            await actorCalled('Alejandro').attemptsTo(
                Click.on(elementsCard)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(textBox)
            )

            await actorCalled('Alejandro').attemptsTo(
                Enter.theValue(name).into(nameTextBox)
            )

            await actorCalled('Alejandro').attemptsTo(
                Enter.theValue(email).into(emailTextBox)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(elementSubButton)
            )
            
            await expect(output).toHaveProperty(outputResult)
            await page.close()

            
        })
    })

    test.describe('Caso 3: Section Forms - Practice Form', () => {

        test('Aparece un modal o mensaje que confirma que el formulario fue enviado exitosamente', async ({actorCalled, }) => { 

            const formsCard = PageElement.located(By.cssContainingText('.card-body','Forms'))
            const firstNameBox = PageElement.located(By.css("input[placeholder='First Name']"))
            const lastNameBox = PageElement.located(By.css("input[placeholder='Last Name']"))
            const mobileBox = PageElement.located(By.css("input[placeholder='Mobile Number']"))
            const genderMale = PageElement.located(By.id('gender-radio-1')).describedAs('custom-control-input')
            const formSubButton = PageElement.located(By.cssContainingText('.btn', 'Submit')).describedAs('button')
            const firstName = "Alejandro"
            const lastName = "Cueca"
            const phoneNumber = 3334445566

            await actorCalled('Alejandro').attemptsTo(
                Click.on(formsCard)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(PageElement.located(By.cssContainingText('.btn', 'Practice Form')).describedAs('text'))
            )

            await actorCalled('Alejandro').attemptsTo(
                Enter.theValue(firstName).into(firstNameBox)
            )

            await actorCalled('Alejandro').attemptsTo(
                Enter.theValue(lastName).into(lastNameBox)
            )

            await actorCalled('Alejandro').attemptsTo(
                Enter.theValue(phoneNumber).into(mobileBox)
            )

            await actorCalled('Alejandro').attemptsTo(
                ExecuteScript.sync('arguments[0].click()').withArguments(genderMale)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(formSubButton)
            )

            
            await actorCalled('Alejandro').attemptsTo(
                Ensure.eventually(ModalDialog.isPresent(), isPresent()),
                ModalDialog.dismissNext(),
                Ensure.that(ModalDialog.lastDialogState(), equals('absent'))
            )
        }) 

    })

    test.describe('Caso 4: Section Alerts, Frame & Windows', () => {
        
        test('La alerta aparece y puede ser aceptada', async ({page, actorCalled}) => { 
            
            const alertsCard = PageElement.located(By.cssContainingText('.card-body','Alerts, Frame & Windows'))
            const alertsButton = PageElement.located(By.id('alertButton')).describedAs('button')
            
            await actorCalled('Alejandro').attemptsTo(
                Click.on(alertsCard)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(PageElement.located(By.cssContainingText('.btn', 'Alerts')).describedAs('text'))
            )
            
            await actorCalled('Alejandro').attemptsTo(
                Click.on(alertsButton)
            )

            page.on('dialog', dialog => {
                expect(dialog.message()).toEqual('You clicked a button')
                dialog.accept
            })

            await page.close()
        })

        test('La nueva ventana/pestaña se abre correctamente', async ({actorCalled, page}) => { 
            
            const alertsCard = PageElement.located(By.cssContainingText('.card-body','Alerts, Frame & Windows'))
            const newTabButton = PageElement.located(By.cssContainingText('.btn', 'New Tab')).describedAs('button')
            
            await actorCalled('Alejandro').attemptsTo(
                Click.on(alertsCard)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(PageElement.located(By.cssContainingText('.btn', 'Browser Windows')).describedAs('text'))
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(newTabButton),
            )

            await actorCalled('Alejandro').attemptsTo(
                Wait.for(Duration.ofSeconds(1)), 
                Switch.to(Page.whichUrl(equals('https://demoqa.com/sample'))),
                Ensure.that(Page.current().url().href, includes('https://demoqa.com/sample')),
                Page.current().close(),
            )

            await page.close() 
            
        })
    })

    test.describe('Caso 5: Section Widgets - Accordion', () => {
        
        
        test('Al hacer clic, el contenido de cada panel se expande correctamente y muestra texto', async ({actorCalled, page}) => { 
            
            const widgetCard  = PageElement.located(By.cssContainingText('.card-body', 'Widgets'))
            const sectionOne = PageElement.located(By.id('section1Heading')).describedAs('card-header')
            const sectionTwo = PageElement.located(By.id('section2Heading')).describedAs('card-header')
            const sectionThree = PageElement.located(By.id('section3Heading')).describedAs('card-header')

            await actorCalled('Alejandro').attemptsTo(
                Click.on(widgetCard)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(PageElement.located(By.cssContainingText('.btn', 'Accordian')).describedAs('text'))
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(sectionOne),
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(sectionTwo)
            )

            await actorCalled('Alejandro').attemptsTo(
                Click.on(sectionThree)
            )
            
        })
    })

    test.describe('Caso 6: Section Interactions - Drag and Drop', () => { 
        
        test('El elemento se puede arrastrar hacia el destino y el resultado refleje que la acción fue correcta', async ({actorCalled, page}) => { 
            
            const interactionCard  = PageElement.located(By.cssContainingText('.card-body','Interactions'))            
            
            await actorCalled('Alejandro').attemptsTo(
                Click.on(interactionCard)
            )
            
            await actorCalled('Alejandro').attemptsTo(
                Click.on(PageElement.located(By.cssContainingText('.btn', 'Droppable')).describedAs('text'))
            )
            
            await page.getByRole('tabpanel').getByText('Drag me').hover()
            await page.mouse.down()
            await page.getByRole('tabpanel').getByText('Drop here').hover()
            await page.mouse.up()

            await expect(page.locator('#droppable').nth(0)).toHaveCSS('background-color', 'rgb(70, 130, 180)')
        
            

        })
    })

    test.describe('Caso 7: Book Store Application - Búsqueda de Libros', () => { 
        
        test('El listado de libros incluye títulos que contienen el término buscado o relacionados con este', async ({actorCalled, page}) => { 
            
            const BookstoreCard  = PageElement.located(By.cssContainingText('.card-body','Book Store Application'))
            const interfasBusqueda = PageElement.located(By.css("input[placeholder='Type to search']"))
            const searchItem = 'Git'

            await actorCalled('Alejandro').attemptsTo(
                Click.on(BookstoreCard)
            )

            await actorCalled('Alejandro').attemptsTo(
                Enter.theValue(searchItem).into(interfasBusqueda)
            )

            await expect(page.getByRole('gridcell').nth(1)).toContainText(["Git Pocket Guide"])
            
        })
    })
})
