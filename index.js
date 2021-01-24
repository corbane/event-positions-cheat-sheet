//@ts-check

document.addEventListener ("DOMContentLoaded", () =>
{
    /** @type {HTMLTemplateElement} */// @ts-ignore
    const tpl = document.getElementById ("fake")

    const main = document.querySelector ("main")
    const btm = document.getElementById ("bt-mode")
    const blk = document.getElementById ("normal")
    const fix = document.getElementById ("fixed")
    const abs = document.getElementById ("absolute")

    blk.append (tpl.content.cloneNode (true))
    fix.append (tpl.content.cloneNode (true))
    abs.append (tpl.content.cloneNode (true))

    var interactive = false

    toggleMode ()
    btm.addEventListener ("click", toggleMode)

    /** @param {MouseEvent} evt */
    function toggleMode (evt = null)
    {
        if (evt) evt.stopImmediatePropagation ()
        interactive = !interactive
        if (interactive) {
            document.removeEventListener ("click", onClick)
            document.addEventListener ("mousemove", onClick)
            document.addEventListener ("click", disableInteractiveMode)
            btm.textContent = "on click"
        } else {
            document.removeEventListener ("mousemove", onClick)
            document.removeEventListener ("click", disableInteractiveMode)
            document.addEventListener ("click", onClick)
            btm.textContent = "Interactive"
        }
    }
    function disableInteractiveMode ()
    {
        if (interactive) toggleMode ()
    }

    document.getElementById ("sidebar").addEventListener ("click", evt => evt.stopImmediatePropagation ())

    const clientX = document.getElementById("clientX")
    const clientY = document.getElementById("clientY")
    const offsetX = document.getElementById("offsetX")
    const offsetY = document.getElementById("offsetY")
    const pageX   = document.getElementById("pageX")
    const pageY   = document.getElementById("pageY")
    // ---
    const target              = document.getElementById("target")
    const target_scrollTop    = document.getElementById("target.scrollTop")
    const target_scrollLeft   = document.getElementById("target.scrollLeft")
    const target_scrollWidth  = document.getElementById("target.scrollWidth")
    const target_scrollHeight = document.getElementById("target.scrollHeight")
    // ---
    const screenX = document.getElementById("screenX")
    const screenY = document.getElementById("screenY")

    /** @type {HTMLInputElement} */// @ts-ignore
    const rule_type_offset = document.getElementById("rule-type-offset")
    /** @type {HTMLInputElement} */// @ts-ignore
    const rule_type_client = document.getElementById("rule-type-client")
    /** @type {HTMLInputElement} */// @ts-ignore
    const rule_type_page   = document.getElementById("rule-type-page")
    const ruleX            = document.getElementById("ruleX")
    const ruleY            = document.getElementById("ruleY")

    /** @param {MouseEvent} evt */
    function onClick (evt)
    {
        if (!(evt.target instanceof HTMLElement)) return

        clientX.innerHTML = evt.clientX.toString ()
        clientY.innerHTML = evt.clientY.toString ()
        offsetX.innerHTML = evt.offsetX.toString ()
        offsetY.innerHTML = evt.offsetY.toString ()
        pageX.innerHTML   = evt.pageX.toString ()
        pageY.innerHTML   = evt.pageY.toString ()

        target.innerHTML              = evt.target.nodeName
        target_scrollTop.innerHTML    = evt.target.scrollLeft.toString ()
        target_scrollLeft.innerHTML   = evt.target.scrollTop.toString ()
        target_scrollWidth.innerHTML  = evt.target.scrollWidth.toString ()
        target_scrollHeight.innerHTML = evt.target.scrollHeight.toString ()

        screenX.innerHTML = evt.screenX.toString ()
        screenY.innerHTML = evt.screenY.toString ()

        showRule (evt)
    }

    /** @param {MouseEvent} evt */
    function showRule (evt)
    {
        if (rule_type_offset.checked) {
            var w = evt.offsetX
            var h = evt.offsetY
        } else if (rule_type_client.checked) {
            var w = evt.clientX
            var h = evt.clientY
        } else if (rule_type_page.checked) {
            var w = evt.pageX
            var h = evt.pageY
        } else {
            return
        }
        ruleX.style.display = ruleY.style.display = "block"
        ruleX.style.left    = ruleY.style.left    = `${evt.pageX - w}px`
        ruleX.style.top     = ruleY.style.top     = `${evt.pageY - h}px`
        ruleX.style.width   = ruleY.style.width   = `${w}px`
        ruleX.style.height  = ruleY.style.height  = `${h}px`
    }
})


