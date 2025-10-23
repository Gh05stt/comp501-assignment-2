document.addEventListener("DOMContentLoaded", function () {
    const navTabs = document.querySelectorAll('.nav-tab')
    const headerBar = document.querySelector('.header-bar')
    const headerHeight = headerBar ? headerBar.offsetHeight : 0

    function updateActiveNavTab() {
        const sections = []

        //populate sections with nav items
        navTabs.forEach(tab => {
            const targetId = tab.querySelector('a').getAttribute('href').substring(1)
            const targetElement = document.getElementById(targetId)
            if (targetElement) {
                sections.push({
                    element: targetElement,
                    navTab: tab,
                    id: targetId
                })
            }
        })

        sections.sort((a, b) => a.element.offsetTop - b.element.offsetTop)

        const scrollPosition = window.scrollY + headerHeight + 50  // 50px buffer for header

        let activeSection = null

        if (window.scrollY <= 50) {
            activeSection = sections[0]
        } else {
            // find section in view
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section.element.offsetTop <= scrollPosition) {
                    activeSection = section
                    break
                }
            }

            // if no section, it's probably the last 
            if (!activeSection && sections.length > 0) {
                activeSection = sections[sections.length - 1]
            }
        }

        if (activeSection) {
            navTabs.forEach(tab => tab.classList.remove('active'))
            activeSection.navTab.classList.add('active')
        }
    }

    // Handle nav tab clicks
    navTabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault()  // Prevent default behavior

            // target section to go to
            const targetId = this.querySelector('a').getAttribute('href').substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                const targetPosition = targetElement.offsetTop - headerHeight - 20

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })

    window.addEventListener('scroll', updateActiveNavTab)

    // initialise active tab
    updateActiveNavTab()
}) 