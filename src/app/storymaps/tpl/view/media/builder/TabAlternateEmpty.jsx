import Tab from './Tab';
import viewTpl from 'lib-build/hbars!./TabAlternateEmpty';
import {} from 'lib-build/less!./TabAlternateEmpty';
import {} from 'lib-build/less!./Common';
import i18n from 'lib-build/i18n!resources/tpl/builder/nls/app';

export default class TabAlternateEmpty extends Tab {
  constructor(params) {
    super(params);

    this.title = i18n.builder.mediaConfig.tabs.mobile;
    this.type = 'alternate';
    this.icon = 'fa-mobile-phone fa-lg';
  }

  render() {
    const { noAltImageUnsupported: unsupportedTitle, noAltImageWarning: partialSupportTitle } = i18n.builder.mediaErrors.contentIssues;
    const { noAltImageUnsupported: unsupportedDescription, noAltImageWarning: partialSupportDescription } = i18n.builder.mediaErrors.contentWarnings;

    return viewTpl({
      strings: i18n.builder.mediaConfig.altMedia,
      hasWarnings: this.showWarnings,
      warningTitle: this.mobileSupported ? partialSupportTitle: unsupportedTitle,
      warningDescription: this.mobileSupported ? partialSupportDescription : unsupportedDescription ,
      emptyWarningDescription: partialSupportDescription
    });
  }

  postCreate(params) {
    super.postCreate(params);

    this._node.find('.config-item[data-action="add"]').on('click', () => {
      this._onAction('alternate-media-add');
    });
    this._node.find('[data-toggle="tooltip"]').tooltip();
  }

  destroy() {
    super.destroy();

    this._node.find('.config-item[data-action="add"]').off('click');
    this._node.find('[data-toggle="tooltip"]').tooltip('destroy');
  }
}
