import { Badge, Popover, Tag } from "antd";

interface MultiTagProps  {
    tags: string[];
    tagDisplay: number;
    title : string
}

/**
 * MultiTag component displays a list of tags with an overflow indicator.
 *
 * @param {string[]} props.tags - The array of tags to display.
 * @param {number} props.tagDisplay - The number of tags to display before showing the overflow indicator.
 *
 * @returns {JSX.Element} The rendered MultiTag component.
 */
export const MultiTag = ({ tags, tagDisplay, title } : MultiTagProps ): JSX.Element => {

  const tagOverflow = (tags : string[]) => {
     if (tags.length === 0 || tags.length <= tagDisplay) return [];
     return tags.slice(tagDisplay, tags.length); 
  }  

  const displayedTags = tags.length > 0 ? tags.slice(0, tagDisplay) : [];
  const moreTags = tagOverflow(tags);

  const moreTagsContent = (
    <div style={{ width: '165px', }} >
        {moreTags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
        ))}
    </div>
 )
  return (
    <div>
        {displayedTags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
        ))}
        { moreTags.length > 0 && (
            <Popover content={moreTagsContent} title={title} trigger="hover" >
                <Badge title={''} 
                       count={`${moreTags.length}+`}  
                       style={{  backgroundColor: '#59577A', cursor: 'pointer'}} />
            </Popover>
        )}    
    </div>
  );
}

