{ <div {.../*i18n*/{ id: 'hello' }} /> }
{ <div><Trans {.../*i18n*/{ a: 1 }} /></div> }
{ <div {...{ id: 'hello' }/* comments */} /> }
{ <div><Trans {...{ a: 1 }/* comments */} /></div> }

{ <div><Trans /*test1 */a="1"/**test2 */b="2"/**test3 */ /></div> }
{ <div><Trans {.../*test1*/{ a: 1}} /**test2 */ b = "2" /*test3 */ /></div> }
