/**
 * Component Loader
 * Utility for dynamically loading HTML components into the page
 */

class ComponentLoader {
  /**
   * Load a component from a file and inject it into a target element
   * @param {string} filePath - Path to the component HTML file
   * @param {string} targetSelector - CSS selector for the target element
   * @returns {Promise} - Promise that resolves when the component is loaded
   */
  static async loadComponent(filePath, targetSelector) {
    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`Failed to load component: ${filePath}`);
      }

      const html = await response.text();
      const targetElement = document.querySelector(targetSelector);

      if (!targetElement) {
        throw new Error(`Target element not found: ${targetSelector}`);
      }

      targetElement.innerHTML = html;

      // Execute any scripts in the loaded HTML
      const scripts = targetElement.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        script.parentNode.replaceChild(newScript, script);
      });

      return targetElement;
    } catch (error) {
      console.error("Error loading component:", error);
      return null;
    }
  }

  /**
   * Load multiple components in parallel
   * @param {Array} components - Array of objects with filePath and targetSelector
   * @returns {Promise} - Promise that resolves when all components are loaded
   */
  static async loadComponents(components) {
    const promises = components.map((component) =>
      this.loadComponent(component.filePath, component.targetSelector)
    );
    return Promise.all(promises);
  }
}

window.ComponentLoader = ComponentLoader;
