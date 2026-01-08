# demoQA-assessment
This is the assessment of a script creation focused on testing many funtionalities of an stablished website. This file is intendet to show the content and coverage of the scrip. The table of content shows the features executed
Here is the link to the site that is being teste: https://demoqa.com/

Every item contains the description of the test as displayed below.

## Caso 1: Navegar a la Página Principal

### La página carga sin errores.
### Se visualizan correctamente las secciones:
    Elements , Forms , Alerts, Frame & Windows , Widgets , Interactions , Book Store Application 

## Caso 2: Section Elements – Text Box

###  La sección muestra información que confirma que los valores ingresados quedaron reflejados 
    (ej. muestra el nombre y correo ingresados). 

## Caso 3: Section Forms – Practice Form

### Aparece un modal o mensaje que confirma que el formulario fue enviado exitosamente.

## Caso 4: Section Alerts, Frame & Windows

### La alerta aparece y puede ser aceptada.
### La nueva ventana/pestaña se abre correctamente. 

## Caso 5: Section Widgets – Accordion

### Al hacer clic, el contenido de cada panel se expande correctamente y muestra texto. 

## Caso 6: Section Interactions – Drag and drop

### El elemento se puede arrastrar hacia el destino y el resultado refleje que la acción fue correcta
    (ej. cambia texto o color)

## Caso 7: Book Store Application – Búsqueda de Libros

###  El listado de libros incluye títulos que contienen el término buscado o relacionados con este. 


The code is build using playwright and serenity js freatures using typescrip. This allows a clearer readability of the code and easier maintenance for future commits.
Along the code you will see both playwright and serenity. this is intented so that we can have high coverage taking advantage of some of the best features of each tool
Here is an example of what they look like: 

### playwright 
    await expect(output).toHaveProperty(outputResult)
            await page.close()


### serenity 
    await actorCalled('Alejandro').attemptsTo(
                Ensure.eventually(ModalDialog.isPresent(), isPresent()),
                ModalDialog.dismissNext(),
                Ensure.that(ModalDialog.lastDialogState(), equals('absent'))
            )
