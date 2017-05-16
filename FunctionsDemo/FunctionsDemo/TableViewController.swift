import UIKit
import Firebase
import FirebaseDatabaseUI

class TableViewController: UITableViewController {

  @IBOutlet weak var textField: UITextField!
  var messagesReference : FIRDatabaseReference?
  var dataSource : FUITableViewDataSource?

  @IBAction func itemAdded(_ sender: Any) {
    messagesReference!.childByAutoId().setValue(["item" :self.textField.text])
    self.textField.text = ""
  }

    override func viewDidLoad() {
        super.viewDidLoad()

        self.textField.addTarget(self.textField, action: #selector(resignFirstResponder),
                                 for: UIControlEvents.editingDidEndOnExit);

      FIRApp.configure()

      messagesReference = FIRDatabase.database().reference().child("wishlist")

      dataSource = FUITableViewDataSource(query: messagesReference!, populateCell: {
        (tableView, indexPath, dataSnapshot) -> UITableViewCell in
        let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell")!
        let value = dataSnapshot.value as! NSDictionary

        let item = value["item"] as! String
        let detail = value["price"] as? String
        cell.textLabel?.text = "\(item) - (\(detail ?? "loading"))"
        return cell
      })

      dataSource!.bind(to: self.tableView)
    }
}
