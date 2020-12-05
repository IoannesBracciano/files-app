/**
 * Represents a single tree node in the tree structure
 */
export interface TreeNode {
  /**
   * The name represents the text that will be displayed in the tree
   * structure for that node
   */
  name: string;

  /**
   * The path of the node in the tree structure
   */
  path: string;

  /**
   * Defines if the node is expandable on click or not
   */
  expandable: boolean;
}