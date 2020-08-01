import { withAnalyticsEvents, withAnalyticsContext, } from '@atlaskit/analytics-next';
import { LocalUploadComponentReact, } from '../localUploadReact';
import { name as packageName, version as packageVersion, } from '../../version.json';
import { ANALYTICS_MEDIA_CHANNEL } from '../media-picker-analytics-error-boundary';
function dragContainsFiles(event) {
    if (!event.dataTransfer) {
        return false;
    }
    const { types } = event.dataTransfer;
    return Array.from(types).indexOf('Files') > -1;
}
export class DropzoneBase extends LocalUploadComponentReact {
    constructor(props) {
        super(props);
        this.uiActive = false;
        this.addContainerListeners = (container = this.getContainer()) => {
            container.addEventListener('dragover', this.onDragOver, false);
            container.addEventListener('dragleave', this.onDragLeave, false);
            container.addEventListener('drop', this.onFileDropped);
        };
        this.removeContainerListeners = (container = this.getContainer()) => {
            container.removeEventListener('dragover', this.onDragOver, false);
            container.removeEventListener('dragleave', this.onDragLeave, false);
            container.removeEventListener('drop', this.onFileDropped);
        };
        this.onDragOver = (e) => {
            e.preventDefault();
            if (e.dataTransfer && dragContainsFiles(e)) {
                const dataTransfer = e.dataTransfer;
                let allowed;
                try {
                    allowed = dataTransfer.effectAllowed;
                }
                catch (e) { } // the error is expected in IE11
                dataTransfer.dropEffect =
                    'move' === allowed || 'linkMove' === allowed ? 'move' : 'copy';
                const length = this.getDraggedItemsLength(dataTransfer);
                this.emitDragOver({ length });
            }
        };
        this.onDragLeave = (e) => {
            if (e.dataTransfer) {
                e.preventDefault();
                let length = 0;
                if (dragContainsFiles(e)) {
                    const dataTransfer = e.dataTransfer;
                    length = this.getDraggedItemsLength(dataTransfer);
                }
                this.emitDragLeave({ length });
            }
        };
        this.onFileDropped = (dragEvent) => {
            if (!dragEvent.dataTransfer) {
                return;
            }
            dragEvent.preventDefault();
            dragEvent.stopPropagation();
            this.onDrop(dragEvent);
            const files = Array.from(dragEvent.dataTransfer.files);
            this.uploadService.addFiles(files);
        };
        this.onDrop = (e) => {
            if (e.dataTransfer && dragContainsFiles(e)) {
                const dataTransfer = e.dataTransfer;
                const fileCount = this.getDraggedItemsLength(dataTransfer);
                this.fireAnalyticsEvent('droppedInto', fileCount);
                if (this.props.onDrop) {
                    this.props.onDrop();
                }
                this.emitDragLeave({ length: fileCount });
            }
        };
    }
    getContainer() {
        const { config: { container }, } = this.props;
        return container || document.body;
    }
    componentDidMount() {
        const { onCancelFn } = this.props;
        this.addContainerListeners(this.getContainer());
        if (onCancelFn) {
            onCancelFn(this.cancel);
        }
    }
    componentWillUnmount() {
        this.removeContainerListeners(this.getContainer());
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { config: { container: newContainer }, } = nextProps;
        const { config: { container: oldContainer }, } = this.props;
        if (newContainer !== oldContainer) {
            this.removeContainerListeners(oldContainer);
            this.addContainerListeners(newContainer);
        }
    }
    // Cross-browser way of getting dragged items length, we prioritize "items" if present
    // https://www.w3.org/TR/html51/editing.html#the-datatransfer-interface
    // This method is used on 'dragover' and we have no way to retrieve FileSystemFileEntry,
    // which contains info about if the dropped item is a file or directory. That info is only
    // available on 'drop'
    getDraggedItemsLength(dataTransfer) {
        if (dataTransfer.items) {
            const items = Array.from(dataTransfer.items);
            return items.filter((i) => i.kind === 'file').length;
        }
        // This is required for IE11
        return dataTransfer.files.length;
    }
    emitDragOver(payload) {
        if (!this.uiActive) {
            const { onDragEnter } = this.props;
            this.uiActive = true;
            this.fireAnalyticsEvent('draggedInto', payload.length);
            if (onDragEnter) {
                onDragEnter(payload);
            }
        }
    }
    emitDragLeave(payload) {
        if (this.uiActive) {
            this.uiActive = false;
            /*
             when drag over child elements, container will issue dragleave and then dragover immediately.
             The 50ms timeout will prevent from issuing that "false" dragleave event
             */
            window.setTimeout(() => {
                if (!this.uiActive) {
                    const { onDragLeave } = this.props;
                    this.fireAnalyticsEvent('draggedOut', payload.length);
                    if (onDragLeave) {
                        onDragLeave(payload);
                    }
                }
            }, 50);
        }
    }
    fireAnalyticsEvent(action, fileCount) {
        const { createAnalyticsEvent } = this.props;
        if (createAnalyticsEvent) {
            const analyticsEvent = createAnalyticsEvent({
                eventType: 'ui',
                actionSubject: 'dropzone',
                action,
                attributes: {
                    packageName,
                    fileCount,
                },
            });
            analyticsEvent.fire(ANALYTICS_MEDIA_CHANNEL);
        }
    }
    render() {
        return null;
    }
}
export const Dropzone = withAnalyticsContext({
    attributes: {
        componentName: 'dropzone',
        packageName,
        packageVersion,
    },
})(withAnalyticsEvents()(DropzoneBase));
//# sourceMappingURL=dropzone.js.map