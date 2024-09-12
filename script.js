document.addEventListener('DOMContentLoaded', () => {
    const promocodeModal = document.getElementById('promocode-modal');
    const applyPromocodeButton = document.getElementById('apply-promocode');
    const cancelPromocodeButton = document.getElementById('cancel-promocode');
    let promocodeLink = document.getElementById('add-promocode-link');
    const promocodeInput = document.getElementById('promocode-input');
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    function closePromocodeModal() {
        promocodeModal.style.display = 'none';
        promocodeLink.focus(); // Return focus to the promocode link
        // document.removeEventListener('keydown', handleFocusTrap);
    }

    function openPromocodeModal() {
        focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        firstFocusableElement = promocodeModal.querySelectorAll(focusableElements)[0];
        const focusableContent = promocodeModal.querySelectorAll(focusableElements);
        lastFocusableElement = focusableContent[focusableContent.length - 1];

        promocodeModal.style.display = 'block';
        firstFocusableElement.focus();

        document.addEventListener('keydown', handleFocusTrap);
    }

    function handleFocusTrap(e) {
        let isEscapePressed = e.key === 'Escape';
        let isTabPressed = e.key === 'Tab';
        if (isEscapePressed) {
            closePromocodeModal();
        }
        if (!isTabPressed) return;
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
    promocodeLink.addEventListener('click', (event) => {
        event.preventDefault();
        openPromocodeModal();
    });

    applyPromocodeButton.addEventListener('click', () => {
        const promocode = promocodeInput.value.trim();
        if (promocode) {
            promocodeLink.innerHTML = `${promocode}`; // Update the link to show the applied promocode
        }
        closePromocodeModal();
    });

    cancelPromocodeButton.addEventListener('click', () => {
        closePromocodeModal();
    });
});